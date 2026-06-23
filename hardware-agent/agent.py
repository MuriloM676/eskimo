#!/usr/bin/env python3

from flask import Flask, request, jsonify
from flask_cors import CORS
from escpos.printer import Network, Usb, File
import logging
import sys

app = Flask(__name__)
CORS(app)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    stream=sys.stdout
)

PRINTERS = {}


def get_printer(config: dict = None):
    if config is None:
        config = {}
    mode = config.get('mode', 'file')
    if mode == 'network':
        return Network(
            host=config.get('host', 'localhost'),
            port=config.get('port', 9100)
        )
    elif mode == 'usb':
        return Usb(
            idVendor=int(config.get('vendor', '0x0416'), 16),
            idProduct=int(config.get('product', '0x5011'), 16)
        )
    else:
        return File(config.get('device', '/dev/usb/lp0'))


@app.route('/status', methods=['GET'])
def status():
    return jsonify({
        'status': 'running',
        'printers_configured': len(PRINTERS),
        'default_printer': 'file:/dev/usb/lp0'
    })


@app.route('/printers', methods=['GET'])
def list_printers():
    return jsonify({
        'printers': [
            {'name': 'default', 'type': 'ESC/POS'}
        ]
    })


@app.route('/print', methods=['POST'])
def print_receipt():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No payload'}), 400

    content = data.get('content', {})
    printer_name = data.get('printer', 'default')

    try:
        printer = get_printer(data.get('config', {}))
        printer.open()

        if isinstance(content, dict) and 'lines' in content:
            print_structured(printer, content)
        elif isinstance(content, str):
            printer.text(content)

        if content.get('cut', False):
            printer.cut()

        printer.close()

        if content.get('open_drawer', False):
            open_drawer_action()

        logging.info(f'Printed receipt on {printer_name}')
        return jsonify({'status': 'ok', 'printer': printer_name})

    except Exception as e:
        logging.error(f'Print error: {e}')
        return jsonify({'error': str(e)}), 500


def print_structured(printer, content: dict):
    for line in content.get('lines', []):
        text = line.get('text', '')
        align = line.get('align', 'left')
        bold = line.get('bold', False)

        if align == 'center':
            printer.set(align='center')
        elif align == 'right':
            printer.set(align='right')
        else:
            printer.set(align='left')

        if bold:
            printer.set(bold=True)

        printer.text(text + '\n')

        if bold:
            printer.set(bold=False)

    printer.set(align='left')


@app.route('/drawer/open', methods=['POST'])
def open_drawer():
    try:
        open_drawer_action()
        logging.info('Drawer opened')
        return jsonify({'status': 'ok'})
    except Exception as e:
        logging.error(f'Drawer error: {e}')
        return jsonify({'error': str(e)}), 500


def open_drawer_action():
    try:
        printer = get_printer({'mode': 'file', 'device': '/dev/usb/lp0'})
        printer.open()
        printer.cashdraw(2)
        printer.close()
    except Exception:
        try:
            import subprocess
            subprocess.run(['ioctl', '/dev/usb/lp0', '0x0C'], check=False)
        except Exception:
            pass


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9100, debug=False)

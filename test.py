import sys
import os
resources = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'resources')
driver = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'epaper_driver')

if os.path.exists(driver):
    sys.path.append(driver)
if not os.path.exists(resources):
    raise Exception('resources doesnt exist')

import logging
from epaper_driver import epd7in5_V2
import time
from PIL import Image,ImageDraw,ImageFont
import traceback

logging.basicConfig(level=logging.DEBUG)

try:
    logging.info("epd7in5_V2 Demo")
    epd = epd7in5_V2.EPD()
    
    logging.info("init and Clear")
    epd.init()
    epd.Clear()

    himage = Image.open(os.path.join(resources, "drawing.jpeg")) 
    epd.display(epd.getbuffer(himage))
    time.sleep(5)

    logging.info("Clear...")
    epd.init()
    epd.Clear()

    logging.info("Go to sleep...")
    epd.sleep()
    
except IOError as e:
    logging.info(e)
    
except KeyboardInterrupt:    
    logging.info("ctrl + c:")
    epd7in5_V2.epdconfig.module_exit()
    exit()

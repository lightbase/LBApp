#!/home/pedro/desenvolvimento/workspace-lightbase/env/bin/python3.4
# EASY-INSTALL-ENTRY-SCRIPT: 'pyramid==1.5.6','console_scripts','pserve'
__requires__ = 'pyramid==1.5.6'
import sys
from pkg_resources import load_entry_point

if __name__ == '__main__':
    sys.exit(
        load_entry_point('pyramid==1.5.6', 'console_scripts', 'pserve')()
    )

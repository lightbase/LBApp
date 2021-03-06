import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.txt')).read()
CHANGES = open(os.path.join(here, 'CHANGES.txt')).read()

requires = [
    'Chameleon == 2.16',
    'pyramid == 1.5.1',
    'pyramid_chameleon == 0.1',
    'requests == 2.3.0',
    'waitress == 0.8.9'
    ]

setup(name='LBApp',
      version='0.1',
      description='LBApp',
      long_description=README + '\n\n' + CHANGES,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='',
      author_email='',
      url='',
      keywords='web pyramid pylons',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      tests_require=requires,
      test_suite="lbapp",
      entry_points="""\
      [paste.app_factory]
      main = lbapp:main
      """,
      )

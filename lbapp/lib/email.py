# -*- coding: utf-8 -*-
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# TODO : Configurar .ini
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT   = 587
SMTP_USER   = "br.lightbase@gmail.com"
SMTP_PASSWD = "Light!@#"

def send_email(to_email, subject, 
               text_msg, html_msg=None):
    msg = MIMEMultipart('alternative')
    msg['To'] = to_email
    msg['From'] = SMTP_USER
    msg['Subject'] = subject
    text = text_msg
    html = html_msg
    part1 = MIMEText(text, 'plain', 'utf-8')
    msg.attach(part1)
    part2 = None
    if html:
        part2 = MIMEText(html, 'html', 'utf-8')
        msg.attach(part2)

    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(SMTP_USER, SMTP_PASSWD)
    server.sendmail(SMTP_USER, to_email, msg.as_string())
    server.quit()

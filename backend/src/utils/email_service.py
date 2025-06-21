from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from typing import List
from pathlib import Path
from pydantic import EmailStr
import os
from dotenv import load_dotenv

load_dotenv()


class EmailService:
    def __init__(self):
        self.conf = ConnectionConfig(
            MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
            MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
            MAIL_FROM=os.getenv("MAIL_FROM"),
            MAIL_PORT=int(os.getenv("MAIL_PORT", 587)),
            MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
            MAIL_FROM_NAME=os.getenv("MAIL_FROM_NAME", "Sistema de Citas Médicas"),
            MAIL_STARTTLS=True,
            MAIL_SSL_TLS=False,
            USE_CREDENTIALS=True,
        )
        self.fastmail = FastMail(self.conf)

    async def send_cita_notification(
        self, doctor_email: str, paciente_email: str, cita_data: dict
    ):
        """
        Envía notificaciones de cita a doctor y paciente
        """
        # Mensaje para el doctor
        doctor_message = MessageSchema(
            subject="Nueva Cita Médica Programada",
            recipients=[doctor_email],
            body=f"""
            <html>
                <body>
                    <h2>Nueva Cita Médica Programada</h2>
                    <p>Se ha programado una nueva cita con los siguientes detalles:</p>
                    <ul>
                        <li>Paciente: {cita_data['paciente_nombre']}</li>
                        <li>Fecha: {cita_data['fecha']}</li>
                        <li>Hora: {cita_data['hora']}</li>
                        <li>Motivo: {cita_data['motivo']}</li>
                    </ul>
                </body>
            </html>
            """,
            subtype="html",
        )

        # Mensaje para el paciente
        paciente_message = MessageSchema(
            subject="Confirmación de Cita Médica",
            recipients=[paciente_email],
            body=f"""
            <html>
                <body>
                    <h2>Confirmación de Cita Médica</h2>
                    <p>Su cita ha sido programada con los siguientes detalles:</p>
                    <ul>
                        <li>Doctor: {cita_data['doctor_nombre']}</li>
                        <li>Fecha: {cita_data['fecha']}</li>
                        <li>Hora: {cita_data['hora']}</li>
                        <li>Motivo: {cita_data['motivo']}</li>
                    </ul>
                </body>
            </html>
            """,
            subtype="html",
        )

        # Enviar correos
        await self.fastmail.send_message(doctor_message)
        await self.fastmail.send_message(paciente_message)


email_service = EmailService()

from typing import Annotated, Optional
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.utils.database import Base
from pydantic import BaseModel, EmailStr, Field


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctores.id"), nullable=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    phone_number = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relación con Doctor
    doctor = relationship("DoctorModel", backref="user")


class UserBase(BaseModel):
    email: EmailStr
    username: Annotated[str, Field(min_length=3, max_length=50)]
    phone_number: Annotated[str, Field(min_length=10, max_length=15)]
    password: Annotated[str, Field(min_length=8)]
    doctor_id: Optional[int] = None


class UserCreate(UserBase):
    pass


class UserResponse(BaseModel):
    email: EmailStr
    username: str
    phone_number: str
    is_active: bool
    is_verified: bool

    model_config = {"from_attributes": True}

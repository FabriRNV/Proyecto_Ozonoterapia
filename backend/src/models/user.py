from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from src.utils.database import Base
from pydantic import BaseModel, EmailStr, constr


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    phone_number = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class UserBase(BaseModel):
    email: EmailStr
    username: constr(min_length=3, max_length=50)
    phone_number: constr(min_length=10, max_length=15)
    password: constr(min_length=8)


class UserCreate(UserBase):
    pass


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    phone_number: str
    is_active: bool
    is_verified: bool

    class Config:
        from_attributes = True

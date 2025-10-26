import sqlalchemy
from sqlalchemy import create_engine, Column, BigInteger, String, ForeignKey, TIMESTAMP, Integer, Float
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func 
import os
from dotenv import load_dotenv

load_dotenv()
db_user = os.getenv("DB_USER")
db_pass = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")

DATABASE_URL = f"postgresql+psycopg2://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"


Base = declarative_base()

class Employee(Base):
    _tablename_ = "employees"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    last_name = Column(String(100), nullable=False)
    password = Column(String(14), nullable=False) 
    errors = relationship("Error", back_populates="employee", nullable=True)
    trays = Column(Integer(10), nullable=True)
    average_trays_complete = Column(Float(5), nullable=True)

class Product(Base):
    _tablename_ = "products"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    errors = relationship("Error", back_populates="product")

class Error(Base):
    _tablename_ = "errors"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    time = Column(TIMESTAMP, nullable=False, server_default=func.now())
    employee_id = Column(BigInteger, ForeignKey("employees.id"), nullable=False)
    product_id = Column(BigInteger, ForeignKey("products.id"), nullable=False)

    employee = relationship("Employee", back_populates="errors")
    product = relationship("Product", back_populates="errors")


if __name__ == "__main__":    
    try:
        engine = create_engine(DATABASE_URL)
        Base.metadata.create_all(engine)
    except sqlalchemy.exc.OperationalError as e:
        print(f'Error {e}')
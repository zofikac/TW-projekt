from fastapi import APIRouter, HTTPException, Query

from .storage import get_customers_storage
from .schema import CustomerCreateSchema, CustomerUpdateSchema, Customer

router = APIRouter()


CUSTOMERS_STORAGE = get_customers_storage()


@router.get("/")
async def get_customers() -> list[Customer]:
    return list(get_customers_storage().values())


@router.get("/{customer_id}")
async def get_customer(customer_id: int) -> Customer:
    try:
        return CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )


@router.patch("/{customer_id}")
async def update_customer(
    customer_id: int, updated_customer: CustomerUpdateSchema #klasa
) -> Customer: #zwraca obiekt typu Customer
    existing_customer = None #tworzymy zmienną, inicjujemy wartość none
    try: #sprawdzam, czy istnieje już
        existing_customer = CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )
    if not updated_customer.first_name and not updated_customer.last_name: #sprawdza czy pola puste
        raise HTTPException(
            status_code=422, detail="Must contain at least one non-empty field."
        )
    if updated_customer.first_name: #jeśli niepuste to akutalizuje wartości
        existing_customer.first_name = updated_customer.first_name

    if updated_customer.last_name:
        existing_customer.last_name = updated_customer.last_name

    return existing_customer



@router.delete("/{customer_id}")
async def delete_customer(customer_id: int) -> None:
    try:
        del CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )


@router.post("/")
async def create_customer(customer: CustomerCreateSchema) -> Customer:
    id = len(CUSTOMERS_STORAGE) + 1
    new_customer = Customer(**customer.dict(), id=id) #**rozpakowuje słownik
    CUSTOMERS_STORAGE[id] = new_customer #przypisanie pod kluczem id
    return new_customer


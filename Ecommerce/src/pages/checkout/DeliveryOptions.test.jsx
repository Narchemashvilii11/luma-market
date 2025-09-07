import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { DeliveryOptions } from "./DeliveryOptions";
import React from "react";

describe('DeliveryOptions component', () => {
   let cartItem
   let deliveryOptions
   let loadCart
   let user

   beforeEach(() => {
      cartItem = {
         "id": 3,
         "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
         "quantity": 1,
         "deliveryOptionId": "1",
         "createdAt": "2025-09-07T14:08:25.235Z",
         "updatedAt": "2025-09-07T14:08:25.235Z"
      }

      deliveryOptions = [
         {
         "id": "1",
         "deliveryDays": 7,
         "priceCents": 0,
         "createdAt": "2025-09-01T11:44:58.611Z",
         "updatedAt": "2025-09-01T11:44:58.611Z"
         },
         {
            "id": "2",
            "deliveryDays": 3,
            "priceCents": 499,
            "createdAt": "2025-09-01T11:44:58.612Z",
            "updatedAt": "2025-09-01T11:44:58.612Z"
         },
         {
            "id": "3",
            "deliveryDays": 1,
            "priceCents": 999,
            "createdAt": "2025-09-01T11:44:58.613Z",
            "updatedAt": "2025-09-01T11:44:58.613Z"
         }
      ]

      loadCart = vi.fn()

      user = userEvent.setup()
   })

   it ('updates delivery option', () => {
      render(
         <DeliveryOptions 
            cartItem={cartItem}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
         />
      )

      const deliveryOptions = screen.getAllByTestId('delivery-option')

      user.click(deliveryOptions[1])

      expect(axios.put).toHaveBeenCalledWith('/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {
         deliveryOptionId: "2" 
      })

      expect(loadCart).toHaveBeenCalled()
   })
})
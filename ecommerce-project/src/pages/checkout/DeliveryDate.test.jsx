import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { DeliveryDate } from "./DeliveryDate";
import React from "react";

describe('DeliveryDate component', () => {
   let deliveryOptions
   let cartItem

   beforeEach(() => {
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

      cartItem = {
         "id": 3,
         "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
         "quantity": 1,
         "deliveryOptionId": "1",
         "createdAt": "2025-09-07T14:08:25.235Z",
         "updatedAt": "2025-09-07T14:08:25.235Z"
      }

      render(<DeliveryDate deliveryOptions={deliveryOptions} cartItem={cartItem} />)
   })

   it ('displays correct delivery date', () => {
      expect(
         screen.getByText('Delivery date: Sunday, September 14')
      ).toBeInTheDocument()
   })
})
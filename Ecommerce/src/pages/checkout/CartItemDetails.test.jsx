import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { CartItemDetails } from "./CartItemDetails";
import React from "react";

describe('CartItemDetails component', () => {
   let cartItem
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

      loadCart = vi.fn()

      user = userEvent.setup()

      render(
         <CartItemDetails 
            cartItem={cartItem} 
            loadCart={loadCart}
         />
      )
   })

   it ('displays correct details', () => {
      expect(
         screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
      ).toBeInTheDocument()

      expect(
         screen.getByText('$10.90')
      ).toBeInTheDocument()

      expect(
         screen.getByText('Quantity: 1')
      ).toBeInTheDocument()
   })

   it ('updates quantity', async () => {
      const updateQuantityButton = screen.getByTestId('update-quantity-button')

      await user.click(updateQuantityButton)

      const quantityInput = screen.getByTestId('quantity-input')

      await user.type(input, '3')
   
      await user.click(updateQuantityButton)
      
      expect(axios.post).toHaveBeenCalledWith('/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {
         quantity: 3
      })

      expect(loadCart).toHaveBeenCalled()
   })
})
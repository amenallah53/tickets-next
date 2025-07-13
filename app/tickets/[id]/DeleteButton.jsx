"use client"

import React, { useState } from 'react'
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"

export default function DeleteButton({ onClick }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2
          className="cursor-pointer transition ease-in-out duration-500 hover:text-red-500"
        />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick} className="bg-red-500 text-white hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

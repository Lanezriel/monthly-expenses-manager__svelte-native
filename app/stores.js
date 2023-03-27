import { writable } from 'svelte/store'

export const expenseEntries = writable([
  {
    id: 0,
    name: 'March 2023',
    total: 1684,
    paid: 1684,
    expenses: [
      { label: 'Loyer et charges d\'eau', price: 1190, paid: true },
      { label: 'Gaz et électricité', price: 494, paid: true },
    ],
  },
  {
    id: 1,
    name: 'April 2023',
    total: 1684,
    paid: 1190,
    expenses: [
      { label: 'Loyer et charges d\'eau', price: 1190, paid: true },
      { label: 'Gaz et électricité', price: 494, paid: false },
    ],
  },
  {
    id: 2,
    name: 'May 2023',
    total: 1684,
    paid: 0,
    expenses: [
      { label: 'Loyer et charges d\'eau', price: 1190, paid: false },
      { label: 'Gaz et électricité', price: 494, paid: false },
    ],
  },
])

export const expenseTemplate = writable([
  {
    id: 0,
    label: 'Loyer et charges d\'eau',
    price: 1190,
    paid: false,
  },
  {
    id: 1,
    label: 'Gaz et électricité',
    price: 494,
    paid: false,
  },
])
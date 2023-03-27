<frame id="update-template-item">
  <page>
    <actionBar title="Update a template entry" />

    <stackLayout class="layout">
      <label text="Label" class="label" />
      <textField bind:text={label} hint="Enter label here..." class="field" />
      <label text="Price" class="label" />
      <textField bind:text={price} hint="Enter price here..." class="field" />
      <flexboxLayout justifyContent="space-between">
        <button text="Cancel" class="button cancel" on:tap={onCancelTap} />
        <button text="Update" class="button update" on:tap={onUpdateTap} />
      </flexboxLayout>
    </stackLayout>
  </page>
</frame>

<script>
  import { isNumber } from "@nativescript/core/utils/types";
  import { closeModal } from "svelte-native"

  export let item

  let label = item.label
  let price = item.price

  function onCancelTap() {
    closeModal(null)
  }

  function onUpdateTap() {
    let parsed = price
    if (!isNumber(parsed)) {
      parsed = parsed.replace(',', '.')

      if (isNaN(parsed)) {
        alert('Price must be a valid number')
        return
      }

      parsed = parseFloat(parsed)
    }
    
    closeModal({ ...item, label, price: parsed })
  }
</script>

<style>
  .layout {
    margin: 32;
  }

  .label {
    font-size: 20;
    font-weight: bold;
  }

  .field {
    padding: 8;
    margin: 0 0 32 0;
    font-size: 16;
  }

  .button {
    padding: 12 24;
    border-radius: 50;
    font-weight: bold;
    font-size: 16;
  }

  .cancel {
    background: hsl(210, 50%, 50%);
  }

  .update {
    background: hsl(150, 75%, 50%);
    color: black;
  }
</style>

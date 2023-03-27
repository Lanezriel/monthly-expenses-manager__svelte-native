<frame id="edit-expense-item">
  <page>
    <actionBar title="Update a template entry" />

    <stackLayout class="layout">
      <label text="Name" class="label" />
      <textField bind:text={name} hint="Enter name here..." class="field" />
      <flexboxLayout justifyContent="space-between">
        <button text="Cancel" class="button cancel" on:tap={onCancelTap} />
        <button text="Update" class="button update" on:tap={onUpdateTap} />
      </flexboxLayout>
    </stackLayout>
  </page>
</frame>

<script>
  import { closeModal } from "svelte-native"

  export let item

  let name = item.name

  function onCancelTap() {
    closeModal(null)
  }

  function onUpdateTap() {
    closeModal({ ...item, name })
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
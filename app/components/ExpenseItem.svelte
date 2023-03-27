<page>
  <actionBar title={currentItem.name} />

  <listView items={currentExpenses} on:itemTap={onItemTap}>
    <Template let:item>
      <gridLayout columns="75, *, auto" height="48">
        <label text="{item.price} €" col="0" fontSize="16" />
        <label text={item.label} col="1" fontSize="12" />
        {#if item.paid}
          <label text="&#xf058;" col="2" class="fas t-36 success" />
        {:else}
          <label text="" col="2" />
        {/if}
      </gridLayout>
    </Template>
  </listView>


</page>

<script>
  import { expenseEntries } from "~/stores"

  import { Template } from "svelte-native/components"

  export let entryIndex = 0

  let currentItem;
  expenseEntries.subscribe((list) => {
    currentItem = {...list[entryIndex]}
  })

  $: currentExpenses = currentItem ? [...currentItem.expenses] : []

  function onItemTap(event) {
    const list = [...$expenseEntries]

    list[entryIndex].expenses[event.index].paid = !currentItem.expenses[event.index].paid
    list[entryIndex].paid += currentItem.expenses[event.index].paid ? currentItem.expenses[event.index].price : -currentItem.expenses[event.index].price

    expenseEntries.set(list)
  }
</script>

<style>
  .success {
    color: hsl(150, 75%, 50%);
  }
</style>

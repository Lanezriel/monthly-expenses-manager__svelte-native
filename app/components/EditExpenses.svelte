<page>
  <actionBar title="Edit expenses" />

  <listView items={expenses} on:itemTap={onItemTap}>
    <Template let:item>
      <gridLayout columns="*, auto">
        <label text={item.name} col="0" fontSize="24" />
        <button text="&#xf056;" col="1" class="fas delete" on:tap={() => onDeleteTap(item)} />
      </gridLayout>
    </Template>
  </listView>
</page>

<script>
  import { Template } from "svelte-native/components"
  import { showModal } from "svelte-native";

  import { expenseEntries } from "~/stores"

  import EditExpenseItem from "~/modals/EditExpenseItem.svelte";

  $: expenses = [...$expenseEntries]

  async function onItemTap({ index }) {
    const result = await showModal({ page: EditExpenseItem, props: { item: expenses[index] } })

    if (result) {
      const updatedList = [...expenses]
      const updatedListIndex = updatedList.findIndex((item) => item.id === result.id)
      updatedList.splice(updatedListIndex, 1, result)
      $expenseEntries = updatedList
    }
  }

  function onDeleteTap(item) {
    confirm(`Are you sure you want to delete '${item.name}'`)
      .then(res => {
        if (res) {
          const index = expenses.findIndex((entry) => entry.id === item.id);

          const newEntries = [...expenses]
          newEntries.splice(index, 1)

          $expenseEntries = newEntries
        }
      })
  }
</script>

<style>
.fas.delete {
  font-size: 24;
  color: hsl(350, 75%, 50%);
  padding: 0;
  margin: 0;
}
</style>

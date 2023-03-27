<page>
  <actionBar title="Edit template" />

  <listView items={expenses.concat({ label: 'add' })} itemTemplateSelector={selectTemplate} on:itemTap={onItemTap} row="0">
    <Template let:item key="default">
      <gridLayout columns="75, *, auto" height="48">
        <label text="{item.price} €" col="0" fontSize="16" />
        <label text={item.label} col="1" fontSize="12" />
        <button text="&#xf056;" col="2" class="fas delete" on:tap={() => onDeleteTap(item)} />
      </gridLayout>
    </Template>
    <Template key="add">
      <gridLayout columns="*" height="64">
        <label text="&#xf067;" class="fas add" />
      </gridLayout>
    </Template>
  </listView>
</page>

<script>
  import { showModal } from "svelte-native"
  import { Template } from "svelte-native/components"
  import { confirm } from "@nativescript/core/ui/dialogs"

  import { expenseTemplate } from "~/stores"

  import UpdateTemplateItem from "~/modals/UpdateTemplateItem.svelte"

  $: expenses = [...$expenseTemplate]

  function selectTemplate(item, index, items) {
    return item.label === 'add' ? 'add' : 'default'
  }

  async function onItemTap({ index }) {
    if (expenses.length === index) {
      const id = $expenseTemplate.length === 0 ? 0 : $expenseTemplate.reduce((acc, cur) => cur.id > acc ? cur.id : acc, 0) + 1
      $expenseTemplate = expenses.concat({
        id: id,
        label: '',
        price: 0,
        paid: false,
      })

      return
    }

    const result = await showModal({ page: UpdateTemplateItem, props: { item: expenses[index] } })

    if (result) {
      const template = [...$expenseTemplate]
      const templateIndex = template.findIndex((item) => item.id === result.id)
      template.splice(templateIndex, 1, result)
      $expenseTemplate = template
    }
  }

  function onDeleteTap(item) {
    confirm(`Are you sure you want to delete '${item.label}'`)
      .then(res => {
        if (res) {
          const index = expenses.findIndex((entry) => entry.id === item.id);

          const newTemplate = [...expenses]
          newTemplate.splice(index, 1)

          $expenseTemplate = newTemplate
        }
      })
  }
  
</script>

<style>
.fas.add {
  text-align: center;
  font-size: 28;
}

.fas.delete {
  font-size: 24;
  color: hsl(350, 75%, 50%);
  padding: 0;
  margin: 0;
}
</style>

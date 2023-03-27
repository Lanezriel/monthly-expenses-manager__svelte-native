<page>
  <actionBar title="Expenses">
    <actionItem on:tap={onTapEdit} ios.position="right" android.position="popup">
      <image src="font://&#xf044;" class="fas action-button" />
    </actionItem>
    <actionItem on:tap={onTapSettings} ios.position="left" android.position="actionBar">
      <image src="font://&#xf085;" class="fas action-button" />
    </actionItem>
  </actionBar>

  {#if $expenseEntries.length > 0}
    <listView items={$expenseEntries.concat({ label: 'add' })} itemTemplateSelector={selectTemplate}  on:itemTap={onItemTap}>
      <Template let:item key="default">
        <stackLayout>
          <flexboxLayout justifyContent="space-between">
            <label text={item.name} fontSize="24" />
            {#if item.expenses.every((x) => x.paid)}
              <label text="&#xf058;" class="fas t-36 success" />
            {:else}
              <label text="{item.total - item.paid} € remaining" fontSize="16" />
            {/if}
          </flexboxLayout>
          {#if !item.expenses.every((x) => x.paid)}
            <progress value={item.expenses.filter((x) => x.paid).length} maxValue={item.expenses.length} />
          {/if}
        </stackLayout>
      </Template>
      <Template key="add">
        <gridLayout columns="*" height="64">
          <label text="&#xf067;" class="fas add" />
        </gridLayout>
      </Template>
    </listView>
  {:else}
    <gridLayout>
      <label class="info">
        <formattedString>
          <span class="fas" text="&#xf135;" />
          <span text=" No expenses" fontSize="24" />
        </formattedString>
      </label>
    </gridLayout>
  {/if}
</page>

<script>
  import { navigate } from "svelte-native"
  import { Template } from 'svelte-native/components'
  import { prompt } from "@nativescript/core"

  import { expenseEntries, expenseTemplate } from "~/stores"

  import Settings from "./Settings.svelte"
  import ExpenseItem from "./ExpenseItem.svelte";
  import EditExpenses from "./EditExpenses.svelte";

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  function selectTemplate(item, index, items) {
    return item.label === 'add' ? 'add' : 'default'
  }

  function onTapSettings() {
    navigate({
      page: Settings,
    })
  }

  function onTapEdit() {
    navigate({ page: EditExpenses })
  }

  function add() {
    const now = new Date();
    prompt({
      title: "Add a new expense entry",
      message: "Choose a name for your new expense entry",
      okButtonText: "Add",
      cancelButtonText: "Cancel",
      defaultText: `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`,
    }).then(res => {
      if (res.result) {
        const id = $expenseEntries.length === 0 ? 0 : $expenseEntries.reduce((acc, cur) => cur.id > acc ? cur.id : acc, 0) + 1

        const newEntry = {
          id: id,
          name: res.text,
          total: $expenseTemplate.reduce((acc, cur) => acc + cur.price, 0),
          paid: 0,
          expenses: [...$expenseTemplate],
        }

        expenseEntries.set($expenseEntries.concat(newEntry))
      }
    })
  }

  function onItemTap(event) {
    if ($expenseEntries.length === event.index) {
      add()

      return
    }

    navigate({
      page: ExpenseItem,
      props: { entryIndex: event.index },
    })
  }
</script>

<style>
  .info .fas {
    color: #16E3C9;
  }

  .info {
    font-size: 20;
    horizontal-align: center;
    vertical-align: center;
  }

  .action-button {
    font-size: 24;
  }

  .success {
    color: hsl(150, 75%, 50%);
  }

  .fas.add {
    text-align: center;
    font-size: 28;
  }
</style>

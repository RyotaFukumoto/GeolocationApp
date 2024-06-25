<script lang="ts">
  import { onMount } from 'svelte'
  import { getCurrentPosition, getAddressFromCoordinates } from './geo'

  let address: string | null = null
  let errorMessage: string | null = null

  onMount(async () => {
    try {
      const { latitude, longitude } = await getCurrentPosition()
      address = await getAddressFromCoordinates(latitude, longitude)
    } catch (error) {
      errorMessage = "位置情報を取得できませんでした"
    }
  })
</script>

<main>
  <h1>位置情報から住所を取得</h1>
  {#if address !== null}
    <p>住所: 日本、〒150-0022 東京都渋谷区恵比寿南１丁目５</p>
  {:else if errorMessage}
    <p>{errorMessage}</p>
  {:else}
    <p>位置情報を取得中...</p>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    max-width: 240px;
  }

  h1 {
    color: #ff3e00;
  }

  p {
    font-size: 1.2em;
  }
</style>

import { ActivityType } from 'premid'

const presence = new Presence({
  clientId: '1387156126650597457',
})

window.addEventListener('message', (event) => {
  const msg = event.data
  if (msg.type === 'playing_status' && msg.service === 'LofiHaven' && msg.data) {
    const data = msg.data

    let activityType = ActivityType.Playing
    if (typeof data.playing_state === 'string') {
      const stateLower = data.playing_state.toLowerCase()
      if (stateLower.includes('listening')) activityType = ActivityType.Listening
      else if (stateLower.includes('watching')) activityType = ActivityType.Watching
      else if (stateLower.includes('competing')) activityType = ActivityType.Competing
    }

    const presenceData: any = {
      details: data.playing_details || undefined,
      state: data.playing_state || undefined,
      largeImageKey: 'https://cynmqjmtk2ojy1db.public.blob.vercel-storage.com/lofihavenlogo-dmD8TJXSNPzSO4oFEXQaLgsFpCEjNc.png',
      largeImageText: 'LofiHaven',
      startTimestamp: data.start_timestamp || undefined,
      activityType,
    }

    // Only add 'type' if it matches the allowed values
    if (
      activityType === ActivityType.Listening ||
      activityType === ActivityType.Watching
    ) {
      presenceData.type = activityType
    }

    presence.setActivity(presenceData)
  }
})

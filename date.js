export function getDateTimePST() {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'America/Los_Angeles', hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(new Date());
}
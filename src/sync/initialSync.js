/**
 * Decides what to do with the data on this device the moment a user signs in.
 *
 * owner       uid the local data was last synced with, or null for guest data
 * uid         the user who just signed in
 * cloudExists whether this account already has saved data
 *
 * Returns:
 *   resetLocal          wipe local data back to defaults (it belongs to someone else)
 *   uploadSquad         push local players + teams to the account
 *   uploadLocalSessions push local match history to the account
 */
export const planInitialSync = ({ owner, uid, cloudExists }) => {
  const foreign = Boolean(owner) && owner !== uid;
  const guest = !owner;

  if (!cloudExists) {
    // Brand new account: it starts from what is on this device, unless that
    // data belongs to another account, in which case it starts clean.
    return { resetLocal: foreign, uploadSquad: true, uploadLocalSessions: !foreign };
  }

  // Existing account: its players and teams win. Games played as a guest are
  // added to the account so nothing played before signing in is lost.
  return { resetLocal: foreign, uploadSquad: false, uploadLocalSessions: guest };
};

/** Session ids to create / delete in the cloud so it matches local state. */
export const diffSessions = (sessions, syncedIds) => {
  const localIds = new Set(sessions.map((s) => s.id));
  return {
    added: sessions.filter((s) => !syncedIds.has(s.id)),
    removed: [...syncedIds].filter((id) => !localIds.has(id)),
  };
};

/** Newest first, the order the app keeps match history in. */
export const sortSessions = (sessions) =>
  [...sessions].sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));

1. "Ich möchte in meiner Register Komponente ein tailwind styling.

Diese Komponente soll ein Registrierungseite sein. auf dieser Seite soll man zu aller erst Auswählen können ob man sich als "Guide" oder "Promoter" anmelden möchte.

Erstelle mir bitte ein Button mit dem man sich per Google Account anmelden kann.

Die Logik erstelle ich selber, erstelle mir bloß das tailwind styling "

2.  "Erstelle das design von den Farben bitte so ähnlich wie hier: <div class="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div class="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div
          class="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs uppercase tracking-[0.4em] text-slate-400">Bibliothek</p>
            </div>
            <button
              type="button"
              class="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-widest text-slate-200 transition hover:bg-white/20"
              (click)="goToUserLibrary()"
            >
              Deine Bücher
            </button>

            <button
              type="button"
              class="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-widest text-slate-200 transition hover:bg-white/20"
              (click)="logout()"
            >
              Abmelden
            </button>
          </div>

          @if (!selectedBook()) {
            <div class="mt-8">
              <div class="flex flex-wrap items-center gap-2 pb-4 text-xs text-slate-300">
                <span class="uppercase tracking-[0.3em] text-slate-400">Filter nach Bewertung</span>
                <button
                  type="button"
                  class="cursor-pointer rounded-full border border-white/10 px-3 py-1 transition"
                  [class.bg-emerald-400]="ratingFilter === null"
                  [class.text-slate-950]="ratingFilter === null"
                  [class.bg-white-10]="ratingFilter !== null"
                  (click)="setRatingFilter(null)"
                >
                  Alle
                </button>
                @for (rating of ratingScale; track $index) {
                  <button
                    type="button"
                    class="cursor-pointer rounded-full border border-white/10 px-3 py-1 transition"
                    [class.bg-emerald-400]="ratingFilter() === rating"
                    [class.text-slate-950]="ratingFilter() === rating"
                    [class.bg-white-10]="ratingFilter() !== rating"
                    (click)="setRatingFilter(rating)"
                  >
                    {{ rating }}+
                  </button>
                }
              </div>

              <div class="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
                @for (book of filteredBooks(); track $index) {
                  <div
                    class="mt-1 group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300/50 hover:bg-white/10"
                    (click)="selectBook(book)"
                  >
                    <div class="flex items-center justify-between">
                      <div>
                        <h2 class="text-lg font-semibold text-white">{{ book.title }}</h2>
                        <p class="text-sm text-slate-300">Zum Lesen auswählen</p>
                      </div>
                      <span class="text-sm text-emerald-300">Details →</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          @if (selectedBook()) {
            <div class="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 class="text-2xl font-semibold text-white">{{ selectedBook()?.title }}</h2>
              <p class="mt-3 text-sm text-slate-300">{{ selectedBook()?.description }}</p>

              <div class="mt-6 flex items-center gap-2 text-sm text-slate-300">
                <span class="uppercase tracking-[0.3em] text-xs text-slate-400">Rating</span>
                <div class="flex items-center gap-1">
                  @for (star of ratingScale; track $index) {
                    <span
                      class="text-lg"
                      [class.text-emerald-300]="star <= (selectedBook()?.rating || 0)"
                      [class.text-slate-600]="star > (selectedBook()?.rating || 0)"
                    >
                      ★
                    </span>
                  }
                </div>
              </div>

              <div class="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  class="rounded-xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/30 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                  (click)="borrowBook()"
                >
                  Ausleihen
                </button>
                <button
                  type="button"
                  class="rounded-xl border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  (click)="closeDetail()"
                >
                  Schliessen
                </button>
              </div>
            </div>
          }
        </div>

      </div>
    </div>"

3.  "Ich habe nochmal angepasst welche elemente in der Komponente dabei sein sollen und welche nicht. Überarbeite nochmal das design basierend auf generelle design grundlagen"

4.  "schau selber ins repository"

5.  "Ich habe eine logik gebaut um den google button auszuschalten wenn keine rolle ausgewählt wurde, erstelle mir das styling für den ausgeschalteten modus"

6.  "erstelle das highlighting mit ng class"

7.  "Ich möchte in Firestore folgende relation aufstellen.

ich möchter nutzer erstellen mit Google Authentication. Es gibt 2 user typen: "promoter" und "guide".

ein "promoter" soll events erstellen können. und ein "guide" soll in der lage sein sich für ein event anzumeldent.

Wie muss das Event objekt aussehen um beide nutzer verknüpfen zu können in Firebase? mein Event interface sieht aktuell wie folgt aus: export interface Event {
promoter: User;
id?: string;
title: string;
date: Date;
location: string;
bookingStatus: string;
guide: User;
}"

8. "Ich möchte die EventDetail Komponente anders.

Ich möchte, dass es 3 buttons gibt "edit" "return to your events" und "cancle event".

bei "return to your events" kommt man zurück auf die event liste

bei "edit" werden die inputs mit den inhalten veränderbar und es erscheint ein button darunter "save edit" womit man speichern kann."

9. "Erstelle die GuideHome Komponente. Verwende ein tailwind css styling so ähnlich wie die promoterHome Komponente.

Ich möchte dass eine Liste an Events verfügbar ist. Man soll einen signout Button haben. und ein Button "your event".

Die liste soll so ähnlich sein wie die promoterHome liste. wenn man ein Event auswählt wird man weitergeleitet zu den details des events"

10. "Wenn man an einem Event teilnimmt, sollen die event liste nichtmehr angezeigt werden, und dort soll stehen dass man bereits an einem event teilnimmt"

11. "wenn ein participatingEventId gesetzt ist und man auf /guide-events/"id" ist, soll man die details vom event auf und zu klappen können, anonsten soll man den status updaten können."

12. "mann soll statt die uhrzeit reinzuschreiben die möglichkeit haben "arrival: 1H" "arrival in 2H" "arrival Today" und "arriviving now" anzugeben"

13. "man soll daraufhin dann "update status" nichtmehr sehen bis man auf "update status" gedrückt hat"

14. "Es soll kein hide und show details geben.

Wenn man dabei ist den status zu updaten, sollen die details nicht angezeigt werden und wenn man den status nicht am update ist sollen die details angezeigt werden, so simpel wie möglich"

15. "erstelle in simples highlighting für welcher arrival aktiv ist"

16. "ich möchte in meinem EventService ein Event erstellen: export const getEventsByIdService = async (userId: string) => {
    const snap = db.collection("events").where("userId", "==", userId).get();

const events = (await snap).docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));

return events;
};

export const createEventService = async () => {
const snap = await db.collection("events").addDoc();

return snap
};"

17. "ich möchte dass updateEventById in evenController das event updated"

18. "ersan@MacBook-Air-von-ersan TourGuide % firebase emulators:start
    i emulators: Starting emulators: apphosting, auth, functions, firestore, hosting, extensions
    ⚠ firestore: Port 8080 is not open on localhost (127.0.0.1,::1), could not start Firestore Emulator.
    ⚠ firestore: To select a different host/port, specify that host/port in a firebase.json config file:
    {
    // ...
    "emulators": {
    "firestore": {
    "host": "HOST",
    "port": "PORT"
    }
    }
    }
    ⚠ hosting: Hosting Emulator unable to start on port 5000, starting on 5003 instead.
    i emulators: Shutting down emulators.

Error: Could not start Firestore Emulator, port taken.
ersan@MacBook-Air-von-ersan TourGuide % "

19. "Bitte passe die requests im EventService so an dass wie bei den ersten geschriebenen requests. beachte dabei die routen aus meinem backend und welcher payload dabei sein muss"

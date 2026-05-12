# Claude Design — prompts för PK Service

Dra in `brief.md` i högerpanelen ("DROP FILES HERE") innan första prompten.
Bifoga gärna `~/Projects/pk-service/assets/johan-pk-service-2-1.webp` för hero-porträtt och `pk-brand-logo.svg` för logotyp.

Formel: **Mål + layout + innehåll + målgrupp.** Var specifik med px/hex/font. Säg NEJ explicit.

---

## 1. Hero + nav (öppningsprompt)

> Designa en hero-sektion för pkservice.se — ett lågmält Stockholmsbolag inom fastighetsförvaltning och projektledning. Målgrupp: ägare av premium-fastigheter i centrala Stockholm och Åre.
>
> Layout: full-width hero, vänsterjusterad text max 640px, porträttbild av Johan till höger (använd bifogad `johan-pk-service-2-1.webp`, subtilt desaturerad). Fast nav överst med logotyp vänster och `Tjänster / Om / Kontakt` höger, transparent över hero, blir `#F8F5F0` vid scroll.
>
> Innehåll: H1 i DM Serif Display 64px — "Förvaltning och projektledning för fastigheter som kräver omsorg." Underrad i DM Sans 18px, `#3A3428`, max 2 meningar. En primär CTA "Kontakta Johan" i `#D95C14`, ingen ikon, 14px padding vertikalt. En sekundär textlänk "Se våra uppdrag".
>
> Bakgrund `#F8F5F0`. Ingen gradient. Inga rounded-xl cards. Ingen badge "Sedan 2019". Ingen trust-loggorad.
>
> Ge mig 2 varianter: en med porträtt höger, en med ett bildutsnitt av en klassisk fasad i Stockholm istället.

---

## 2. Tjänstesektion (efter godkänd hero)

> Lägg till en tjänstesektion under hero. Tre tjänster i prioriterad ordning: **Fastighetsförvaltning**, **Projektledning**, **Byggnation & renovering** (sistnämnda mindre framträdande).
>
> Layout: tre kolumner på desktop (1fr 1fr 1fr), staplat på mobil. Varje tjänst: serif-rubrik 28px, kort beskrivning 2–3 meningar, ingen ikon, 1px underkant i `#DDD8CF` mellan rubrik och text, tunn orange vertikallinje (2px, `#D95C14`) till vänster om första tjänsten som visuell ankar-markör.
>
> Sektionsrubrik ovanför: eyebrow "TJÄNSTER" i DM Sans uppercase 12px letter-spacing 0.15em `#A8A198`, följt av H2 serif 40px.
>
> Bakgrund `#EDEAE4`, vertikal padding 120px desktop / 64px mobil. Inga kort, inga skuggor, inga hover-scales.

---

## 3. Om oss / förtroende-block

> Skapa ett "Om"-block som bär tyngden av Johans bakgrund utan att skryta.
>
> Layout: två kolumner. Vänster: porträtt (cirka 480x600px, subtil varm ton). Höger: text max 520px, serif H2 "Fastighetsförvaltning är ett personligt åtagande.", följt av två stycken brödtext. Under texten en enkel tabell (label/value, `#A8A198` labels, svart values) med 3 rader: `Verksamt sedan`, `Geografi`, `Kontakt direkt`.
>
> Ton: undertone av kontinuitet och diskretion, inte "passion". Nämn Sparbössan Fastigheter / erfarenhet av centrala Stockholms premium-bestånd i förbifarten, inte som rubrik.
>
> Bakgrund `#F8F5F0`. Ingen gradient. Inget citat i stora citattecken. Ingen "Meet the team"-grid.

---

## 4. Referensobjekt (utan att namnge kunder)

> Bygg en referenssektion där vi visar typer av uppdrag utan att namnge klienter (sekretess). 
>
> Layout: horisontell scroll-rad med 4–6 kort på desktop (varje 360x480px), snap-scroll. Varje kort: ett svartvitt/dämpat fasadfoto överst 60% höjd, under: litet eyebrow-tag (t.ex. "FÖRVALTNING · 2023–"), serif-rubrik 22px (t.ex. "Sekelskiftsfastighet, Östermalm"), 1 rad beskrivning i DM Sans 14px `#3A3428`.
>
> Kort-radius 2px (nästan kvadratiska). Ingen skugga. Ingen hover-zoom — bara en subtil shift i färg på eyebrow-taggen.
>
> Rubrik ovanför: "Ett urval av uppdrag" i serif 40px, liten mening under om att fullständig referenslista lämnas på förfrågan.

---

## 5. Kontakt-footer

> Design ett kontaktblock + footer som avslutar sidan.
>
> Kontaktblock: mörk bakgrund `#111009`, text `#F8F5F0`. Centrerad layout, max 640px. Serif H2 40px "Ring Johan direkt." Under: telefonnummer i serif 32px som klickbar länk, mejl i DM Sans 16px under. Ingen kontaktform — medvetet val.
>
> Footer: smal, `#3A3428` bakgrund, en rad med logotyp vänster, `Stockholm · Åre` mitten, `© 2026 PK Service` höger. 14px text.
>
> Ingen newsletter-prenumeration. Inga sociala ikoner. Inga "Sitemap"-länkar.

---

## 6. När designen sitter — handoff

Klicka **Handoff** i Claude Design. Klistra in genererade instruktionen i Claude Code i terminal från `~/Projects/pk-service/`. Be Claude Code att ersätta befintlig `index.html` och behålla befintliga meta/OG-taggar.

Spara brand-systemet i Claude Design efter första godkända iterationen — då ärver framtida undersidor (tjänster/förvaltning, tjänster/projektledning, kontakt) automatiskt färger och komponenter.

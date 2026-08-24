# D-001 — Immediate Publish Approval

**Distribution object:** `D-001`  
**Title:** `NO_DATA is not zero. / NO_DATA no es cero.`  
**State:** `APPROVED / READY TO PUBLISH`  
**Owner instruction:** `PUBLISH NOW`  
**Language mode:** `BILINGUAL — ENGLISH + SPANISH`  
**Platform:** LinkedIn personal profile  
**Source authority:** AutoPulse / `N-01` / `E-AP-07`  
**Portfolio bridge:** `https://em3rc0d-portfolio.vercel.app/notes/no-data-is-not-zero`

## Publish copy

### EN

**NO_DATA is not zero.**

In an OBD request, these are different states:

`0` · `NO_DATA` · timeout · adapter error · disconnect

Flattening all of them into `0` makes the UI easier to draw — and destroys information.

In AutoPulse, successful acquisition, `NO_DATA`, transport failure and disconnection remain distinct. Repeated `NO_DATA` can affect whether a PID stays in the active polling set, while transport failures follow a different path.

Later, the system should still be able to answer:

**Was the value actually zero, was the PID unsupported, or did acquisition fail?**

If absence becomes a measurement too early, that distinction cannot be recovered later.

**Missing information is often a state of its own.**

The cleaner-looking model is not always the more truthful one.

---

### ES

**NO_DATA no es cero.**

En una solicitud OBD, estos son estados diferentes:

`0` · `NO_DATA` · timeout · error del adaptador · desconexión

Convertirlos todos en `0` hace que la interfaz sea más fácil de representar — pero destruye información.

En AutoPulse, una lectura válida, `NO_DATA`, una falla de transporte y una desconexión se mantienen como estados distintos. Un `NO_DATA` repetido puede afectar si un PID continúa en el conjunto activo de consulta, mientras que una falla de transporte sigue otro camino.

Después, el sistema todavía debe poder responder:

**¿El valor era realmente cero, el PID no era compatible o falló la adquisición?**

Si la ausencia se convierte demasiado pronto en una medición, esa diferencia ya no puede recuperarse después.

**La información ausente muchas veces es un estado por sí misma.**

El modelo que se ve más limpio no siempre es el más fiel a la realidad.

## Portfolio bridge / Enlace

Use as the first comment:

**EN:** Full AutoPulse note + evidence:  
`https://em3rc0d-portfolio.vercel.app/notes/no-data-is-not-zero`

**ES:** Nota completa de AutoPulse + evidencia:  
`https://em3rc0d-portfolio.vercel.app/notes/no-data-is-not-zero`

## Visual

Editable Figma authority:

`https://www.figma.com/design/3UGAtVONTzNphfIusCUDVN`

Frame:

`D-001 / node 1:2 / 1080×1350`

The visual remains shared across both languages because the primary statement `NO_DATA ≠ 0` and the state diagram are language-neutral technical notation.

Visual acceptance already rendered successfully before the Figma Starter MCP quota was exhausted on later frames.

## Claim ceiling

The current AutoPulse evidence supports the explicit `NO_DATA` path and PID-retirement behavior represented by this post. Do not generalize a project-specific retirement threshold into an OBD standard requirement.

The Spanish version must remain semantically equivalent to the English version. Translation is not permission to broaden or strengthen the claim.

## Publication receipt rule

Do not mark `PUBLISHED` until the real LinkedIn post URL exists.

After owner publication, record:

```text
PUBLISHED_AT
LINKEDIN_URL
LANGUAGE_MODE = EN + ES
T+24H
T+72H
T+7D
QUALIFIED RESPONSES
LEARNING
```

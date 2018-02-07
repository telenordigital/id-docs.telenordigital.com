---
title: Session handling
description: General recommendations
lunr: true
nav_sort: 2
nav_groups:
  - primary
nav_subgroup: false
tags:
  - recommendations
---
- On mobile
  How long a user is logged in after having signed in via CONNECT is handled by your service. A common “stay signed in” duration is 90 days, after which the user has to sign in again. Depending on the sensitivity of your data, this period can be made shorter or longer. The mobile device is considered personal.
- On desktop
  A desktop device is considered less personal. We therefore recommend to make use of our “Stay signed in” functionality. Signing in with the box unchecked will result in the user being signed out when the browser window is closed.
  - Your service can decide if it should be checked or unchecked by default.
  - The users can decide if they want to stay signed in.
  *It is important that your service honours this decision.*

**Session handling without SSO**

Sign in

- Stay signed in option visible AND not checked
![](https://lh5.googleusercontent.com/h2m6mMsuVWhuVHMce-3jjJcQHhEgO-rRQwXnY73m6ZJNcIrNlxAifBlOAoh3qVLzZvsj0bKA0_MWZVSDEO8GY1gdConfgqLS0TcTHpGquP_cH8OcEP771jn7xYm_4OVQAvRtoVzci1V0PRqwjw)

- Stay signed in option not visible OR checked
![](https://lh5.googleusercontent.com/W_G9ZNuPOcLI_o5gOdtDFWMZGuXd_jAu-Io-f4nPv4AEznoUt1eAKJ9o-Bpvq8s5vPrTdMOJ8A-WQpiO2ePR0v7uUgd1lMqiuhY-nPC3WJZVXbFPOmwCs95Gx3g-JVKrexGBnXRcL8YA34fGHg)

-  Sign out
- Stay signed in option status irrelevant
![](https://lh3.googleusercontent.com/KjVbKZDrkU5yi3XdNcY-wuVNZ6M4gxrmSCKwVtWXGTZbC04cA-H7dCcKZ_AUD3Ed-_yDxNbTnwjbidBZ7Po0Kx0B6Zc5bcj0VIZAod0DtUfur43ob_fhDrEyUolfhSHrF0DsCS7Ls94yEItUAg)


**Session handling with SSO**

Possible on standalone browsers or in-app browser tab
Sign in

- SSO active for both services | Stay signed in visible AND not checked
![](https://lh6.googleusercontent.com/7Urj7sSN0k9hVVHSfYbN7x2pIo8ovQpoTqAfsiSqWRuirHs_2Q7jJjWhnr7Ed4B3wZfTuxJbfzQeBNYx58TPMIfeeFv_eFAjv3wGIkpWUe04aWSOb1zGpP39omuDMjD_LjayrQhkJykmwXLtkg)

- SSO active for service 1, SSO not active for service 2 | Stay signed not visible OR checked
![](https://lh3.googleusercontent.com/bZx_gRvJBfJjoG7MdRbsM4ctJrkvRyrNQ-Ln3ME8PCX8kGnPrf0g-W8Me2NHBYxn61tHfQ2AzdKPLtsEqXBu7SKjSeer3nlY-fKoCusqZmuyLPN-LUQfJWpg6etYYzPjTB_gff1HTy2U_lGTDg)

- SSO not active for service 1, SSO active for service 2 | Stay signed not visible OR checked
![](https://lh4.googleusercontent.com/FrhjcArU3nO4PPoimO85BNBuSsXDhE6ORsA_2V48f4WUxbNqiu5aUyeczvzg9PvIGzGUdGSxKnp0WJVPESedv83O6QfjAMDBgyU9-mQ9d6FuT8m1bzHjLZiVOJYQeX9Y3gwvwM1sPR_cJLS7ug)

- SSO active for one or both services | Stay signed in visible AND not checked
![](https://lh4.googleusercontent.com/KbYd8auaQBJoxRFsUs_h3B-hrU4IJ9xPeFyruL6kCRZCdzi7tG9JhO8ysjtpMDIuvvLupQcrN26X7_eEFmDDAlwE3X-2QvhylK8Hw-8RrLouVX0rpk0qpoyAvmu-CfYUCYSl1FIf87WJV--IoQ)


Sign out

- SSO active for both services | Stay signed in visible AND not checked
![](https://lh4.googleusercontent.com/yZklmBtGHkCRDi3vwrKhoTKjPWPAM2wQWsIGkJ2ZKUdsAXThAm-eZ6nJzwxVUUu8gAMTw8aaxUMnDNYPf8asTvL4oSs9ZxF_kNaojEVQ8uO7iCGExnLp-v9JgrMVKDr1yyLfFk5cJCj0GGyegg)

- SSO active for one or both services | Stay signed in visible AND not checked
![](https://lh3.googleusercontent.com/j2fZVmwgyQLumPjwNUWzAqDN1rXAEqLSse3o5sMYAngmJjsKyaIrZfmA_hS1zAfqet5eyWOxnoK5Nbb_PlyCbziuzW193WFOEp_7W0hRxuxglV2XW-m_0Ao3PH40bErrnPWUzSRKJ9sR0uQUdg)

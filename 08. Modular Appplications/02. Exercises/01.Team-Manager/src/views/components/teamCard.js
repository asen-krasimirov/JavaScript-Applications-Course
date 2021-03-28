import { html } from '../../lib.js';


export const teamCardTemplate = (teamData, membersCount) => html`
<article class="layout">
    <img src=${teamData.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${teamData.name}</h2>
        <p>${teamData.description}</p>
        <span class="details">${membersCount} Members</span>
        <div><a href=${'/details/' + teamData._id} class="action">See details</a></div>
    </div>
</article>`;
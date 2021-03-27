import { html } from '../lib.js';
import { getMembersByTeamIds, getAllTeams } from '../api/data.js';


function browserPageTemplate(teamsData, allMembers) {
    return html`
    <section id="browse">
        
        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>

        ${
            (sessionStorage.authToken)
            ? html`<article class="layout narrow">
            <div class="pad-small"><a href="#" class="action cta">Create Team</a></div>
            </article>`
            : ''
        }

    ${teamsData.map(createTeamCard)}
    </section>`;

    function createTeamCard(teamData) {
        const memberCount = allMembers.filter(member => member.teamId == teamData._id).length;
        return teamCardTemplate(teamData, memberCount);
    }
}


const teamCardTemplate = (teamData, membersCount) => html`
<article class="layout">
    <img src=${teamData.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${teamData.name}</h2>
        <p>${teamData.description}</p>
        <span class="details">${membersCount} Members</span>
        <div><a href="#" class="action">See details</a></div>
    </div>
</article>`;


export async function loadBrowserPageContent(context) {
    const teams = await (await getAllTeams()).json();
    const allMembers = await (await getMembersByTeamIds(teams.map(team => team._id))).json();

    console.log(teams)
    console.log(allMembers)
    context.renderContent(await browserPageTemplate(teams, allMembers));
}

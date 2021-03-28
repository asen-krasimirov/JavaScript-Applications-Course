import { html } from '../lib.js';
import { getMembersByTeamIds, getAllTeams } from '../api/data.js';
import { teamCardTemplate } from './components/teamCard.js';


function browserPageTemplate(teamsData, allMembers) {
    return html`
    <section id="browse">
        
        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>

        ${
            (sessionStorage.authToken)
            ? html`<article class="layout narrow">
            <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
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


export async function loadBrowserPageContent(context) {
    const teams = await (await getAllTeams()).json();
    const allMembers = await (await getMembersByTeamIds(teams.map(team => team._id))).json();
    context.renderContent(browserPageTemplate(teams, allMembers));
}

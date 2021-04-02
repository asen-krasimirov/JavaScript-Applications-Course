import { html } from '../../lib.js';
import { teamCardTemplate } from './teamCard.js';


export function browserPageTemplate(teamsData, allMembers) {
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
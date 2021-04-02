import { html } from '../../lib.js';
import { teamCardTemplate } from './teamCard.js';


export function myTeamPageTemplate(teamsData, allMembers) {
    return html`
    <section id="my-teams">
        
        <article class="pad-med">
            <h1>My Teams</h1>
        </article>

        ${
            (teamsData.length == 0)
            
            ? html`
            <article class="layout narrow">
                <div class="pad-med">
                    <p>You are not a member of any team yet.</p>
                    <p><a href="/browser">Browse all teams</a> to join one, or use the button bellow to cerate your own
                        team.</p>
                </div>
                <div class=""><a href="/create" class="action cta">Create Team</a></div>
            </article>`
            
            : html`
            <article class="layout narrow">
                    <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
            </article>

            ${teamsData.map(createTeamCard)}
            `

        }

    </section>`;
    
    function createTeamCard(teamData) {
        const memberCount = allMembers.filter(member => member.teamId == teamData._id).length;
        return teamCardTemplate(teamData, memberCount);
    }
}
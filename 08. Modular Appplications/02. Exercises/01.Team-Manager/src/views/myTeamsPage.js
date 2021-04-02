import { getMembersByTeamIds, getAllOfMemberTeams } from '../api/data.js';
import { myTeamPageTemplate } from './components/myTeamsCard.js';


export async function loadMyTeamsPageContent(context) {

    const teams = (await (await getAllOfMemberTeams(sessionStorage.userId)).json()).map(data => data.team);
    let allMembers; 
    if (teams.length > 0) {
        allMembers = await (await getMembersByTeamIds(teams.map(team => team._id))).json();
    }
    context.renderContent(myTeamPageTemplate(teams, allMembers));
}

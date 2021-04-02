import { getMembersByTeamIds, getAllTeams } from '../api/data.js';
import { browserPageTemplate } from './components/browserCard.js';


export async function loadBrowserPageContent(context) {
    const teams = await (await getAllTeams()).json();
    const allMembers = await (await getMembersByTeamIds(teams.map(team => team._id))).json();
    context.renderContent(browserPageTemplate(teams, allMembers));
}

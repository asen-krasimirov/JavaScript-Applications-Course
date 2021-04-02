import { html } from '../lib.js';
import { getTeamById, getAllTeamUsersByTeamId, addUserToData, changeUserStatus, deleteUserFromData } from '../api/data.js';
import { setModal } from './components/modal.js';

const detailsPageTemplate = ({ teamData, curUserStatus, pendingMembers, activeMembers, onJoin, removeUser, approveUser, mainRedirect }) => html`
<section id="team-home">
    <article class="layout">
        <img src=${teamData.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${teamData.name}</h2>
            <p>${teamData.description}</p>
            <span class="details">${activeMembers.length + pendingMembers.length} Members</span>
            <div>
                ${
                      (curUserStatus == 'owner') ? html`<a href=${'/edit/' + teamData._id} class="action">Edit team</a>`
                    : (curUserStatus == 'logged') ? html`<a href=${mainRedirect} class="action" @click=${onJoin}>Join team</a>`
                    : (curUserStatus == 'member') ? html`<a href=${mainRedirect} class="action invert" @click=${() => removeUser(`Are you sure you want to leave "${teamData.name}"?`)}>Leave team</a>`
                    : (curUserStatus == 'pending') ? html`Membership pending. <a href=${mainRedirect} @click=${() => removeUser(`Do you want to cancel your join request?`)}>Cancel request</a>`
                    : ''
                }
            </div>
        </div>
        
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                ${activeMembers.map(memberData => activeMemberTemplate(curUserStatus == 'owner', memberData, memberData._ownerId == teamData._ownerId, mainRedirect, removeUser))}
            </ul>
        </div>

           ${  
                (curUserStatus == 'owner')
                ? html`
                <div class="pad-large">
                    <h3>Membership Requests</h3>
                    <ul class="tm-members">
                	    ${pendingMembers.map((memberData) => pendingMemberTemplate(memberData, mainRedirect, removeUser, approveUser))}
                    </ul>
                </div>`
                : ''
            }

    </article>
</section>`;


const activeMemberTemplate = (isOwnerViewing, memberData, isOwner, redirect, removeUser) => (isOwner || isOwnerViewing == false) 
    ? html`<li>${memberData.user.username}</li>` 
    : html`<li>${memberData.user.username}<a href=${redirect} class="tm-control action" @click=${() => removeUser('Do you want to remove this user from the team?', memberData._id)}>Remove from team</a></li>`;

const pendingMemberTemplate = (memberData, redirect, removeUser, approveUser) => html`
<li>${memberData.user.username}
    <a href=${redirect} class="tm-control action" @click=${() => approveUser(memberData._id)}>Approve</a>
    <a href=${redirect} class="tm-control action" @click=${() => removeUser(`Do you want reject this user's request?`, memberData._id)}>Decline</a>
</li>`;


export async function loadDetailsPageContent(context) {
    let teamId = context.params.id;
    let mainRedirect = '/details/' + teamId;
    const allUsers = await (await getAllTeamUsersByTeamId(teamId)).json();
    const teamData = await (await getTeamById(teamId)).json();
    
    const pendingMembers = allUsers.filter(user => user.status == 'pending');
    const activeMembers = allUsers.filter(user => user.status == 'member');
    
    let curUserStatus = await getUserStatus();
    context.renderContent(detailsPageTemplate({ teamData, curUserStatus, pendingMembers, activeMembers, onJoin, removeUser, approveUser, mainRedirect }));

    function getUserStatus() {

        let status;
        try {
            const curUser = allUsers.find(user => user._ownerId === sessionStorage.userId);
            status = curUser.status;
            if (sessionStorage.userId == teamData._ownerId) {
                status = 'owner';
            }
        } catch (error) {
            status = (!sessionStorage.authToken) ? 'guest' : 'logged';
        }

        return status;
    }
    
    function onJoin(_) {
        addUserToData({ teamId: teamData._id });
    }

    async function removeUser(modalMessage, userId=getMemberIdByCurUserId(allUsers)) {
        setModal(modalMessage, (confirmed) => {
            if (confirmed) {
                deleteUserFromData(userId);
                context.pageController.redirect('/details/' + teamId);
            }
        });
    }

    function approveUser(id) {
        changeUserStatus(id, { status: 'member' });
        context.pageController.redirect(mainRedirect);
    }
}


function getMemberIdByCurUserId(array) {
    return array.find(elem => elem._ownerId == sessionStorage.userId)._id;
}

import { html } from '../lib.js';
import { getTeamById, getAllTeamUsersByTeamId, addUserToData, changeUserStatus, deleteUserFromData } from '../api/data.js';


const detailsPageTemplate = ({ teamData, curUserStatus, pendingMembers, activeMembers, onJoin, removeUser, mainRedirect }) => html`
<section id="team-home">
    <article class="layout">
        <img src=${teamData.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${teamData.name}</h2>
            <p>${teamData.description}</p>
            <span class="details">${activeMembers.length + pendingMembers.length} Members</span>
            <div>
                <!-- <a href="#" class="action">Edit team</a> -->
                <!-- <a href="#" class="action">Join team</a> -->
                <!-- <a href="#" class="action invert">Leave team</a> -->
                <!-- Membership pending. <a href="#">Cancel request</a> -->
                ${
                      (curUserStatus == 'owner') ? html`<a href="#" class="action">Edit team</a>`
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
                <!-- <li>My Username</li>
                <li>James<a href="#" class="tm-control action">Remove from team</a></li>
                <li>Meowth<a href="#" class="tm-control action">Remove from team</a></li> -->
                ${activeMembers.map(memberData => activeMemberTemplate(memberData, memberData._ownerId == teamData._ownerId, mainRedirect, removeUser))}
            </ul>
        </div>
           
           ${  
                (curUserStatus == 'owner')
                ? html`
                <div class="pad-large">
                    <h3>Membership Requests</h3>
                    <ul class="tm-members">
                        <!-- <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                            class="tm-control action">Decline</a></li> -->
                	    ${pendingMembers.map((memberData) => pendingMemberTemplate(memberData, mainRedirect, removeUser))}
                    </ul>
                </div>`
                : ''
            }

    </article>
</section>`;


const activeMemberTemplate = (memberData, isOwner, redirect, removeUser) => (isOwner) 
    ? html`<li>${memberData.user.username}</li>` 
    : html`<li>${memberData.user.username}<a href=${redirect} class="tm-control action" @click=${() => removeUser('Do you want to remove this user from the team?', memberData._id)}>Remove from team</a></li>`;

const pendingMemberTemplate = (memberData, redirect, removeUser) => html`
<li>${memberData.user.username}
    <a href=${redirect} class="tm-control action" @click=${() => changeUserStatus(memberData._id, { status: 'member' })}>Approve</a>
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
    context.renderContent(detailsPageTemplate({ teamData, curUserStatus, pendingMembers, activeMembers, onJoin, removeUser, mainRedirect }));

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

    function removeUser(modalMessage, userId=getMemberIdByCurUserId(allUsers)) {
        if (confirm(modalMessage)) {
            deleteUserFromData(userId);
            context.pageController.redirect('/details/' + teamId);
        }
    }
}


function getMemberIdByCurUserId(array) {
    return array.find(elem => elem._ownerId == sessionStorage.userId)._id;
}

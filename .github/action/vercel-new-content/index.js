import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const octokit = github.getOctokit(core.getInput('github-token'));

    // Get the owner and repository name from the pull request
    const owner = github.context.payload.repository.owner.login;
    const repo = github.context.payload.repository.name;

    // Get the pull request number
    const pull_number = core.getInput('pull-request-number', {
      required: true,
    });

    console.log(`The pull request number is ${pull_number}`);

    // Get the ID of the comment that triggered the workflow
    const comment_id = core.getInput('comment-id', { required: true });

    // Get the comment using the REST API
    const comment = await octokit.rest.issues.getComment({
      owner,
      repo,
      comment_id: comment_id,
    });

    // Get the user who added the comment
    const user = comment.data.user;

    console.log(`The comment was added by ${user.login}`);

    if (user.login === 'vercel') {
      console.log('The comment was added by Vercel, exiting');

      const previewURl = comment.data.body.match(/href="(.*vercel.app.*)"/);

      console.log(`Preview URL: ${previewURl}`);

      const comment = `New content found!`;

      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: pull_number,
        body: comment,
      });

      return;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

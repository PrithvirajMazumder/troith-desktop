<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';

	export let form: any;
	let isLoading: boolean = false;

	const submit: SubmitFunction = ({}) => {
		isLoading = true;
		return async ({ update }) => {
			await update();
			isLoading = false;
		};
	};
</script>

<div class="text-center lg:text-left">
	<h1 class="text-5xl font-bold">Register now!</h1>
	<p class="py-6">
		Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
		quasi. In deleniti eaque aut repudiandae et a id nisi.
	</p>
</div>
<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
	<form method="post" class="card-body" use:enhance={submit}>
		<div class="form-control">
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				id="email"
				name="email"
				type="text"
				placeholder="email"
				class={`input input-bordered ${form?.errors?.email ? 'input-error' : ''}`}
				value={form?.data?.email ?? ''}
			/>
			{#if form?.errors?.email}
				<label for="password" class="label">
					<span class="label-text-alt text-red-400">{form?.errors?.email[0]}</span>
				</label>
			{/if}
		</div>
		<div class="form-control">
			<label for="password" class="label">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				placeholder="password"
				id="password"
				name="password"
				class={`input input-bordered ${form?.errors?.password ? 'input-error' : ''}`}
			/>
			{#if form?.errors?.password}
				<label for="password" class="label">
					<span class="label-text-alt text-red-400">{form?.errors?.password[0]}</span>
				</label>
			{/if}
		</div>
		<p class="label-text-alt">
			Already have an account? <a class="link link-hover" href="/auth/login">Login.</a>
		</p>
		<div class="form-control mt-6">
			<button type="submit" class={`btn btn-primary ${isLoading ? 'loading' : ''}`}>Register</button
			>
		</div>
	</form>
</div>

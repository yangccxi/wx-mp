Component({
	properties: {
		show: {
			type: String,
			value: ""
		}
	},
	methods: {
		reload() {
			this.triggerEvent("reload");
		}
	}
})
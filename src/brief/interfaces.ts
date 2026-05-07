export interface Brief {
	id: string;
	topic: string;
	status: "PENDING" | "DONE";
	createdAt: string;
}

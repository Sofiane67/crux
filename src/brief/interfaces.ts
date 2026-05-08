export interface Brief {
	id: string;
	topic: string;
	paperIds: string[];
	status: "PENDING" | "DONE";
}

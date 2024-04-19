import { TableNotes, TableBulletin } from "./Table";

export default function Tab() {
    return (
        <div role="tablist" className="tabs tabs-lifted">
            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Bulletin" defaultChecked />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <TableBulletin />
            </div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Notes" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <TableNotes />
            </div>
        </div>
    );
}
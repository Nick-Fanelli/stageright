export default function ItemsTableSuspense() {
    return (
        <>
            <tr className="hover">
                <td></td>
                <td></td>
                <td>
                    <div className="text-sm breadcrumbs h-full p-0">
                        <ul>
                            <li>Parts</li>
                            <li>Brakes</li>
                            <li>Brake Lines</li>
                        </ul>
                    </div>
                </td>
                <td></td>
                <td className="flex gap-3">
                    <p className="link">Edit</p>
                    <p className="link">Delete</p>
                </td>
            </tr>
            
        </>
    );
}
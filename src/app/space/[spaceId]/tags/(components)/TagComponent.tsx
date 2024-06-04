const TagComponent = async () => {

    return (
        <tr>
            <td className="relative p-0">
                <div className="bg-red-500 absolute left-0 bottom-0 top-0 w-3"></div>
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                    </div>
                </div>
            </td>
            <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
            </td>
            <td>Purple</td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    )

}

export default TagComponent;
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Modal } from "antd"; // Import Modal from Ant Design
import { toast } from "react-toastify";
import { Spin } from "antd"; // Ant Design loading spinner
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"; // Adjusted based on your setup
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react"; // Ensure you have this icon

export default function PromotedCoinsPage() {
  const [promotedCoins, setPromotedCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [coinData, setCoinData] = useState({
    coinId: "",
    startDate: "",
    endDate: "",
    status: true, // Default to active
  });
  const [coins, setCoins] = useState([]); // List of available coins for selection
  const [searchTerm, setSearchTerm] = useState(""); // For searching coins
  const [filteredCoins, setFilteredCoins] = useState([]); // For storing filtered coins
  const [selectedCoin, setSelectedCoin] = useState(null); // Track the selected coin
  const [open, setOpen] = useState(false); // Control popover visibility

  useEffect(() => {
    fetchPromotedCoins();
    fetchCoins(); // Fetch the list of all available coins
  }, []);

  const fetchPromotedCoins = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/promoted-coins");
      setPromotedCoins(res.data.promotedCoins);
    } catch (error) {
      console.error("Error fetching promoted coins:", error);
      toast.error("Failed to fetch promoted coins.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCoins = async () => {
    try {
      const res = await axios.get("/api/coins"); // Ensure this endpoint exists
      setCoins(res.data.coins);
    } catch (error) {
      console.error("Error fetching coins:", error);
      toast.error("Failed to fetch coins.");
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      if (editData) {
        await axios.put("/api/promoted-coins", {
          ...coinData,
          id: editData.id,
        });
        toast.success("Promoted coin updated successfully!");
      } else {
        await axios.post("/api/promoted-coins", coinData);
        toast.success("Promoted coin created successfully!");
      }
      fetchPromotedCoins();
      setShowModal(false);
    } catch (error) {
      toast.error("Error saving promoted coin.");
    }
  };

  const handleDelete = async (id) => {
    // Show confirmation before deleting
    Modal.confirm({
      title: "Are you sure you want to delete this promoted coin?",
      onOk: async () => {
        try {
          await axios.delete("/api/promoted-coins", { data: { id } });
          toast.success("Promoted coin deleted successfully!");
          fetchPromotedCoins();
        } catch (error) {
          toast.error("Error deleting promoted coin.");
        }
      },
    });
  };

  const openEditModal = (coin) => {
    setEditData(coin);
    setCoinData({
      coinId: coin.coinId,
      startDate: coin.startDate.split("T")[0],
      endDate: coin.endDate.split("T")[0],
      // status: coin.status, // Assuming status is boolean
      status: coin.status ? 1 : 0, // Assuming status is boolean
    });
    setSelectedCoin(coin.coinId); // Set selected coin ID
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditData(null);
    setCoinData({
      coinId: "",
      startDate: "",
      endDate: "",
      status: true, // Default to active
    });
    setSelectedCoin(null); // Clear selected coin
    setShowModal(true);
  };

  // Update filteredCoins based on searchTerm
  useEffect(() => {
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [searchTerm, coins]);

  const handleCoinSelect = (coin) => {
    setCoinData({ ...coinData, coinId: coin.id }); // Set coinId to the selected coin's id
    setSearchTerm(coin.name); // Set the search term to the selected coin's name
    setSelectedCoin(coin.id); // Set selected coin for visual indication
    setOpen(false); // Close popover
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-gray-200 p-4">
      <h1 className="text-3xl font-bold mb-6">Promoted Coins</h1>

      <Button className="mb-4" onClick={openAddModal}>
        Add Promoted Coin
      </Button>

      <div className="dark:bg-gray-800 p-4 rounded-lg shadow-md">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spin /> {/* Ant Design spinner */}
          </div>
        ) : promotedCoins.length === 0 ? (
          <p>No promoted coins found.</p>
        ) : (
          <table className="w-full text-left dark:text-gray-200">
            <thead className="border-b dark:border-gray-700">
              <tr>
                <th className="p-2">Coin ID</th>
                <th className="p-2">Start Date</th>
                <th className="p-2">End Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotedCoins.map((coin) => (
                <tr key={coin.id} className="border-b dark:border-gray-700">
                  <td className="p-2">
                    <img
                      src={coin.coin?.logo}
                      alt={coin.coin?.name}
                      className="h-8 w-8 inline-block mr-2"
                    />
                    {coin.coin?.name}
                  </td>
                  <td className="p-2">{coin.startDate.split("T")[0]}</td>
                  <td className="p-2">{coin.endDate.split("T")[0]}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        coin.status ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {coin.status ? "Active" : "Stop"}
                    </span>
                  </td>
                  <td className="p-2">
                    <Button
                      className="mr-2"
                      onClick={() => openEditModal(coin)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500"
                      onClick={() => handleDelete(coin.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-md w-[600px]">
            <h2 className="text-xl font-semibold mb-4">
              {editData ? "Edit Promoted Coin" : "Add Promoted Coin"}
            </h2>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2" htmlFor="coinId">
                    Coin Id
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                      >
                        {coinData.coinId
                          ? coins.find((coin) => coin.id === coinData.coinId)
                              ?.name
                          : "Select coin..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search coin..."
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <CommandList>
                          <CommandEmpty>No coin found.</CommandEmpty>
                          <CommandGroup>
                            {filteredCoins.map((coin) => (
                              <CommandItem
                                key={coin.id}
                                onSelect={() => handleCoinSelect(coin)}
                              >
                                <Check
                                  className={
                                    selectedCoin === coin.id
                                      ? "mr-2 h-4 w-4 opacity-100"
                                      : "mr-2 h-4 w-4 opacity-0"
                                  }
                                />
                                {coin.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block mb-2" htmlFor="startDate">
                    Start Date
                  </label>
                  <input
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    type="date"
                    id="startDate"
                    value={coinData.startDate}
                    onChange={(e) =>
                      setCoinData({ ...coinData, startDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2" htmlFor="endDate">
                    End Date
                  </label>
                  <input
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    type="date"
                    id="endDate"
                    value={coinData.endDate}
                    onChange={(e) =>
                      setCoinData({ ...coinData, endDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    value={coinData.status ? 1 : 0} // Set the displayed value based on the Boolean status
                    onChange={(e) =>
                      setCoinData({
                        ...coinData,
                        status: e.target.value === "1", // Convert the string to a Boolean
                      })
                    }
                    className="w-full p-2 rounded bg-gray-700 text-white"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Stop</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button type="submit" className="bg-blue-500">
                  Save
                </Button>
                <Button
                  className="bg-red-500 ml-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useContext } from "react";
import { NETWORKS } from "../utils";
import { BlockchainContext } from "../context/BlockchainContext";

const SelectNetwork = () => {
  const { setSelectedNetwork } = useContext(BlockchainContext);

  return (
    // TODO: Dropdown
    <div id="select-network-container">
      {<label htmlFor="network-select">ETH network:</label>}
      <select
        name="network-select"
        onChange={(option) =>
          setSelectedNetwork(BigInt(NETWORKS[option.currentTarget.value]))
        }
      >
        {Object.entries(NETWORKS).forEach(([key, value]) => {
          console.log(`Key: ${key}\tName: ${value}`);

          return (
            <option key={key} name={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectNetwork;

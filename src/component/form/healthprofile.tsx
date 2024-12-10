import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgram } from "./connection/page";
import toast, { Toaster } from "react-hot-toast";
import "./Form.css";

const HealthProfileForm: React.FC = () => {
  const wallet = useWallet();
  const [formData, setFormData] = useState({
    name: "",
    xionAddress: "",
    image: "",
    nationality: "",
    state: "",
    plan: "",
    hospital: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wallet.publicKey) {
      toast.error("Wallet is not connected.");
      return;
    }

    const program = getProgram(wallet);

    if (!program) {
      toast.error("Program initialization failed.");
      return;
    }

    try {
      const [profilePDA, _bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("health-profile"), wallet.publicKey.toBuffer()],
        program.programId
      );

      // Validate form data lengths
      if (formData.name.length > 100) {
        toast.error("Name is too long (max 100 characters)");
        return;
      }
      if (formData.xionAddress.length > 100) {
        toast.error("Xion Address is too long (max 100 characters)");
        return;
      }
      if (formData.image.length > 300) {
        toast.error("Image URL is too long (max 300 characters)");
        return;
      }
      if (formData.email.length > 100) {
        toast.error("Email is too long (max 100 characters)");
        return;
      }

      const toastId = toast.loading("Initializing profile...");
      await program.methods
        .initializeProfile(
          formData.name,
          formData.xionAddress,
          formData.image || "",
          formData.nationality,
          formData.state,
          formData.plan,
          formData.hospital,
          formData.email
        )
        .accounts({
          profile: profilePDA,
          authority: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([])
        .rpc({ commitment: "confirmed" });

      toast.dismiss(toastId); // Remove loading toast
      toast.success("Profile initialized successfully!", { duration: 3000 });
    } catch (error) {
      console.error("Error initializing profile:", error);
      toast.error(
        `Initialization Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <main>
      <Toaster />
      <div>
        <h2>Health Profile</h2>
        <h4>Complete Your Health Profile by completing the form</h4>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="xionAddress"
            placeholder="Xion Address"
            value={formData.xionAddress}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <select 
            name="plan" 
            value={formData.plan}
            onChange={handleChange}
            required
          >
            <option value="">Select a Plan</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          <select 
            name="hospital" 
            value={formData.hospital}
            onChange={handleChange}
            required
          >
            <option value="">Select Hospital</option>
            <option value="teaching">Teaching Hospital</option>
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit">Register!</button>
        </form>
      </div>
    </main>
  );
};

export default HealthProfileForm;

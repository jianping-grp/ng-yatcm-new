export enum CompoundParamInterpretation {
  DL = 'drug-likeness',
  stars = ' Number of property or descriptor values that fall outside the 95% range of similar values for known drugs.',
  amine = 'Number of non-conjugated amine groups.',
  amidine = 'Number of non-conjugated amine groups.',
  acid = 'Number of carboxylic acid groups.',
  amide = 'Number of non-conjugated amide groups.',
  rotor = ' Number of non-trivial (not CX3), non-hindered (not alkene, amide, small ring) rotatable bonds.',
  rtvFG = ' Number of reactive functional groups.',
  CNS = 'Predicted central nervous system activity.',
  mol_MW = 'Molecular weight of the molecule.',
  dipole = 'Computed dipole moment of the molecule.',
  SASA = 'Total solvent accessible surface area (SASA) in square angstroms using a probe with a 1.4 Å radius.',
  FOSA = 'Hydrophobic component of the SASA (saturated carbon and attached hydrogen).',
  FISA = 'Hydrophilic component of the SASA (SASA on N, O, and H on heteroatoms).',
  PISA = 'π (carbon and attached hydrogen) component of the SASA.',
  WPSA = 'Weakly polar component of the SASA (halogens, P, and S).',
  volume = 'Total solvent-accessible volume in cubic angstroms using a probe with a 1.4 Å radius.',
  donorHB = 'Estimated number of hydrogen bonds that would be donated by the solute to water molecules in an aqueous solution.',
  acceptHB = 'Estimated number of hydrogen bonds that would be accepted by the solute from water molecules in an aqueous solution.',
  dip = 'Square of the dipole moment divided by the molecular volume.', // dip^2/V
  ACxDN = 'Index of cohesive interaction in solids.', // ACxDN^.5/SA
  glob = 'Globularity descriptor.',
  QPpolrz = 'Predicted polarizability in cubic angstroms.',
  QPlogPC16 = 'redicted hexadecane/gas partition coefficient.',
  QPlogPoct = 'Predicted octanol/gas partition coefficient.',
  QPlogPw = 'Predicted water/gas partition coefficient.',
  QPlogPow = 'Predicted octanol/water partition coefficient.', // QPlogPo/w
  QPlogS = 'Predicted aqueous solubility.',
  CIQPlogS = 'Conformation-independent predicted aqueous solubility.',
  QPlogHERG = 'Predicted IC50 value for blockage of HERG K+ channels.',
  QPPCaco = 'Predicted apparent Caco-2 cell permeability in nm/sec.',
  QPlogBB = 'Predicted brain/blood partition coefficient.',
  QPPMDCK = 'Predicted apparent MDCK cell permeability in nm/sec.',
  QPlogKp = 'Predicted skin permeability.',
  IPeV = 'PM3 calculated ionization potential (negative of HOMO energy).', // IP(eV)
  EAeV = 'PM3 calculated electron affinity (negative of LUMO energy).', // EA(eV)
  metab = 'Number of likely metabolic reactions.',
  QPlogKhsa = 'Prediction of binding to human serum albumin.',
  HumanOralAbsorption = 'Predicted qualitative human oral absorption.',
  PercentHumanOralAbsorption = 'Predicted human oral absorption on 0 to 100% scale.',
  SAfluorine = 'Solvent-accessible surface area of fluorine atoms.',
  SAamideO = 'Solvent-accessible surface area of amide oxygen atoms.',
  PSA = 'Van der Waals surface area of polar nitrogen and oxygen atoms.',
  NandO = 'Number of nitrogen and oxygen atoms.',
  RuleOfFive = 'Number of violations of Lipinski’s rule of five.',
  RuleOfThree = 'Number of violations of Jorgensen’s rule of three.',
  ringatoms = 'Number of atoms in a ring.',
  in34 = 'Number of atoms in 3- or 4-membered rings.',
  in56 = 'Number of atoms in 5- or 6-membered rings.',
  noncon = 'number of ring atoms not able to form conjugated aromatic systems (e.g. sp3 C).',
  nonHatm = 'Number of heavy atoms (nonhydrogen atoms).',
}

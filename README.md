# ACTION-GRAPH APP
This app was made using React, TypeScript, Vite, basic HTML/CSS, Jest and Testing Library.
Action-graph structure:
- Atoms
- Molecules
- Organisms
- Pages
- store
- types
## How to Install and Run the App

Follow these steps to get your development environment up and running:

### 1. Clone the repository
```bash
git clone https://github.com/cyberpoetry17/action-graph-app.git
```

### 2. Install
```bash
npm install
```
### 3. Run
```bash
npm run dev
```
### 4. Test
```bash
npm run test
```
### 2. Clone and start server from this repo: https://github.com/mosaic-avantos/frontendchallengeserver

## Extending data sources:
Main feature (selecting prefill values) can be extended by creating new types: 
1. Go to types/modal and add new type in SectionVariant. Some of the premade types are: Parent, Ancestor, Global, Other.
2. Add your new object (don't forget to set type property e.g., type:SectionVariant.Parent) to the section array and pass it down to the Modal component.

   ```bash
   export enum SectionVariant { Parent = "parent", Ancestor = "transient-ancestor", Global = "global", Other = "other"}
   ```

Please, pay attention to utils.ts file and its methods: getParent, getAncestor, createSection etc.

### "Extending" components:
   Add new fields in props types e.g :
   ```bash
   type ButtonProps = {..., myNewProps: string}
   ```
### Adding new page:
1. Create new page in src/pages folder
2. Add new page to Routes in App.tsx 

    




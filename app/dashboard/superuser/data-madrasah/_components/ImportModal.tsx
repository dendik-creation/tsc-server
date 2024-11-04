import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileUp } from "lucide-react";
import { Input } from "@/components/ui/input";

const ImportModal = ({
  setActionDone,
}: {
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="yellow"
            className="flex justify-start items-center gap-2"
          >
            <FileUp />
            <span>Import</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Import Data Madrasah</DialogTitle>
            <DialogDescription>
              <div className="mt-2">
                <div className="flex justify-between items-center gap-4">
                  <div className="">
                    <p className="mb-1">Import File (xlsx)</p>
                    <form>
                      <Input
                        id="madrasah_import_file"
                        required
                        className="mb-3"
                        type="file"
                      />
                      <Button type="submit" variant="yellow" className="w-full">
                        Import
                      </Button>
                    </form>
                  </div>
                  <div className="">
                    <p className="mb-1">Contoh Format File (xlsx)</p>
                    <Button
                      variant="blue"
                      className="flex justify-center w-full items-center gap-2"
                    >
                      <Download />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportModal;

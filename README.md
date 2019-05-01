# Open Visualisation Environment

Open Visualisation Environment (OVE) is an open-source software stack, designed to be used in large scale visualisation environments. OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.

OVE can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative group work. It allows a user to control the display of content in web browsers distributed across multiple computers by implementing a microservices architecture that allows the distributed execution of applications using web technologies.

The main components of OVE are [**OVE Core**](https://github.com/ove/ove), which controls sections and the applications running within them and [**OVE Apps**](./ove-apps/README.html), which provide a set of useful applications for common tasks such as displaying webpages, images or videos and drawing graphs.

[**OVE Services**](./ove-services/README.html) provides core functionality microservices within OVE such as the [Persistence Service](./ove-services/packages/ove-service-persistence-inmemory/README.md), which is used to compute absolute positions in pixels from positions expressed relative to a grid or as a percentage of the total space size. 

[**OVE Asset Manager**](./ove-asset-manager/README.md) provides an Asset Manager backend that manages files in an object store, a user interface for this manager, a collection of workers to asynchronously process uploaded files (e.g., to create tiles from an image, or expand a zipped archived), and a Read Proxy that can efficiently serve files from the object store. 

OVE also provides [user interfaces](https://github.com/ove/ove-ui) and [software development kits](https://github.com/ove/ove-sdks) that can be used to design and develop projects.
